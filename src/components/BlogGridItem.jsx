import React from 'react';
import "./BlogGridItem.scss"
export default function BlogGridItem({ post }) {
	let img = post.attributes.cover.data.attributes
	let thumb = post.attributes.cover.data.attributes.formats.small.url
	let date = post.attributes.date ? new Date(post.attributes.date).toLocaleDateString('fr-FR', {year: 'numeric', month: 'long'}) : null
	return (
		<div className="col-lg-4 BlogGridItem">
			<article className="link-card">
				<a href={`/realisation/${post.attributes.slug}`}>
					<div className="card-img">
						{img && <img src={thumb } alt="preview"></img>}
						{date && (
						<span>{date}</span>
						)}
						<div className="desc">
						<h2>
							{post.attributes.title}
						</h2>
						<p>
							{post.attributes.content}
						</p>
					</div>
					</div>
					
				</a>
			</article>
		</div>
	);
}