let url = '';
let createfileUrl = '';

if ((process.env.NODE_ENV || '').trim() === 'production') {
  url = '/api/';
  createfileUrl = '';
} else {
  url = 'http://localhost:5000/api/';
  createfileUrl = 'http://localhost:5000';
}

export const fileUrl = createfileUrl;
export default url;
