import BlogGridItem from './BlogGridItem';
import React, { useState, useEffect } from 'react';
import "./BlogGrid.scss"
import Button from './Button.jsx';

export default function BlogGrid({ posts, limit, title }) {
	if (!limit) {
		limit = 1000
	}
	const [categorys, setCategorys] = useState(null);
	const [postToShow, setPostToShow] = useState(posts);
	useEffect(() => {

		fetch(`${import.meta.env.PUBLIC_POKEAPI}/api/categories`)
		.then(res => res.json())
		.then(res => {
			setCategorys(res.data)
		})
	  }, []);
	
	function handleCat(id) {
		let toShow
		if (id == "all") {
			toShow = posts
		} else {
			toShow = posts.filter(el => el.attributes.category.data && el.attributes.category.data.id == id )
		}
		setPostToShow(toShow)
		handleNav(id)
	}

	function handleNav(id) {
		const allNavBtn = document.querySelectorAll('nav span')
		allNavBtn.forEach(el => el.classList.remove('active'))
		const btnToActive = document.querySelector(`[data-catid="${id}"]`)
		btnToActive.classList.add('active')
	}
	return (
		<section className="post container-lg p-0 BlogGrid">
			<div className="row gy-3">
				<h2>{title}</h2>
				<nav className="col-12">
					<span className='active' onClick={() => handleCat("all")} data-catid="all">Tout</span>
					{categorys && categorys.map((cat, key) => <span key={key} onClick={() => handleCat(cat.id)} data-catid={cat.id}>{cat.attributes.name}</span>)}
				</nav>
				{postToShow && postToShow.length > 0 ? postToShow.map((post, key) => key < limit ? <BlogGridItem post={post} key={key} /> : null) : (<p>Aucune réalisation</p>)}
				<div className="d-flex mt-2">
					<div className="ms-auto">
						<Button href="/realisations" title="Tous voir"/>
					</div>
				</div>
			</div>
		</section>
	);
}