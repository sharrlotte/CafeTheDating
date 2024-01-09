const devEnv = {
	backend_url: 'http://localhost:8080/api/v1',
};

const prodEnv: typeof devEnv = {
	backend_url: 'https://thedatingcoffee.onrender.com/api/v1',
};

export const env = process.env.NODE_ENV === 'development' ? devEnv : prodEnv;
