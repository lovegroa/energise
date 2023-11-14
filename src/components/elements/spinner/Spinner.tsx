const Spinner = () => {
	return (
		<div className='h-full flex justify-center' style={{ alignItems: 'center' }}>
			<div className=' animate-spin border-t-4 border-green-500 border-solid h-12 w-12 rounded-full' />
		</div>
	);
};

export default Spinner;
