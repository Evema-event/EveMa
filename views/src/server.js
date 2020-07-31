let url = '';

if ((process.env.NODE_ENV || '').trim() === 'production') {
  url = '/api/';
} else {
  url = 'http://localhost:5000/api/';
}

export default url;
