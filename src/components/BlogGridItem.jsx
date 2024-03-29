import React from 'react';
import "./BlogGridItem.scss"
export default function BlogGridItem({ post }) {
	/* console.log(post.attributes.category.data); */
	let img = post.attributes.cover.data
	let thumb
	if (img) {
		thumb = img.attributes.formats.small.url
	}
	
	let date = post.attributes.date ? new Date(post.attributes.date).toLocaleDateString('fr-FR', {year: 'numeric', month: 'long'}) : null
	const API_URL = import.meta.env.PUBLIC_POKEAPI;
	return (
		<div className="col-lg-4 BlogGridItem">
			<article className="link-card">
				<a href={`/realisation/${post.attributes.slug}`}>
					<div className="card-img">
						{img && <img src={thumb } alt="preview"></img>}
						{date && (
						<span>{date}</span>
						)}
					</div>
					<h2>
						{post.attributes.title}
					</h2>
					<p>
						{post.attributes.content}
					</p>
				</a>
			</article>
		</div>
	);
}