import React from 'react';
export default function Button({ href, title }) {
	return (
	<a href={href} data-astro-prefetch>
		<button className="btn-action">{title}</button>
	</a>
	)
}
