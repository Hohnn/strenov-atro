import BlogGridItem from './BlogGridItem';
import React, { useState, useEffect } from 'react';
import "./BlogGrid.scss"
import Button from './Button.jsx';
import "../../node_modules/placeholder-loading/src/scss/placeholder-loading.scss";

export default function BlogGrid({ limit, title, cat }) {
	if (!limit) {
		limit = 1000
	}
	const [categories, setCategories] = useState([]);
	const [posts, setPosts] = useState({});
	const [postToShow, setPostToShow] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState(cat);

	useEffect(() => {
	if (!categories.length) {
		fetch(`${import.meta.env.PUBLIC_POKEAPI}/api/categories`)
		.then(res => res.json())
		.then(res => setCategories(res.data));
	}
	}, []);

	useEffect(() => {
		console.log('test');
		fetch(`${import.meta.env.PUBLIC_POKEAPI}/api/posts?populate=*&sort=publishedAt:desc`)
		  .then(res => res.json())
		  .then(res => {
			setPosts(res.data);
			setPostToShow(
				selectedCategory
				  ? res.data.filter(post => post.attributes.category.data ? post.attributes.category.data.id === selectedCategory : null )
				  : res.data
			  );
		  });
	  }, []);

	useEffect(() => {
		if (posts.length) {
			setPostToShow(
				selectedCategory
				? posts.filter(post => post.attributes.category.data ? post.attributes.category.data.id === selectedCategory : null )
				: posts
			);
		}
	}, [selectedCategory]);
	
	return (
		
		<section className="post container-lg p-0 BlogGrid">
			<div className="row gy-3">
				<h2>{title}</h2>
				<nav className="col-12">
					<span className={ selectedCategory ? '' : 'active'} onClick={() => setSelectedCategory(null)} data-catid="all">Tout</span>
					{categories && categories.map((cat, key) => <span className={ cat.id == selectedCategory ? 'active' : ''} key={key} onClick={() => setSelectedCategory(cat.id)} data-catid={cat.id}>{cat.attributes.name}</span>)}
				</nav>
				{postToShow && postToShow.length > 0 ? 
					postToShow.map((post, key) => key < limit ? <BlogGridItem post={post} key={key} /> : null) 
					: 
					(
						<div className="ph-item">
							<div className="ph-col-4">
								<div className="ph-picture"></div>
								<div className="ph-row">
									<div className="ph-col-8 big"></div>
									<div className="ph-col-4 empty big"></div>
									<div className="ph-col-10"></div>
									<div className="ph-col-2 empty"></div>
									<div className="ph-col-6"></div>
									<div className="ph-col-6 empty"></div>
								</div>
							</div>
							<div className="ph-col-4">
								<div className="ph-picture"></div>
								<div className="ph-row">
									<div className="ph-col-8 big"></div>
									<div className="ph-col-4 empty big"></div>
									<div className="ph-col-10"></div>
									<div className="ph-col-2 empty"></div>
									<div className="ph-col-6"></div>
									<div className="ph-col-6 empty"></div>
								</div>
							</div>
							<div className="ph-col-4">
								<div className="ph-picture"></div>
								<div className="ph-row">
									<div className="ph-col-8 big"></div>
									<div className="ph-col-4 empty big"></div>
									<div className="ph-col-10"></div>
									<div className="ph-col-2 empty"></div>
									<div className="ph-col-6"></div>
									<div className="ph-col-6 empty"></div>
								</div>
							</div>
						</div>
						
					)
				}
				<div className="d-flex mt-2">
					<div className="ms-auto">
						<Button href="/realisations" title="Tous voir"/>
					</div>
				</div>
			</div>
		</section>
	);
}