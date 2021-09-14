import './loading.scss';

const Loading = () => {
	return (
		<div className="loading-container">
			<div className="loading-spinner">
				<div className="loading-spinner-item">
					<div
						style={{ left: '80px', top: '38px', animationDelay: '0.125s' }}
					></div>
					<div
						style={{ left: '38px', top: '38px', animationDelay: '0s' }}
					></div>
					<div
						style={{ left: '122px', top: '38px', animationDelay: '0.25s' }}
					></div>
					<div
						style={{ left: '38px', top: '80px', animationDelay: '0.875s' }}
					></div>
					<div
						style={{ left: '122px', top: '80px', animationDelay: '0.375s' }}
					></div>
					<div
						style={{ left: '38px', top: '122px', animationDelay: '0.75s' }}
					></div>
					<div
						style={{ left: '80px', top: '122px', animationDelay: '0.625s' }}
					></div>
					<div
						style={{ left: '122px', top: '122px', animationDelay: '0.5s' }}
					></div>
				</div>
			</div>
			<h1>FluxCommerce</h1>
			<p>FluxCommerce esta cargando...</p>
		</div>
	);
};

export default Loading;
