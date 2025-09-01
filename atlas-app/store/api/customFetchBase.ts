// import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';

// const baseQuery = fetchBaseQuery({
//   baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
//   prepareHeaders: (headers, { getState }) => {
//     // Add auth token if available
//     if (typeof window !== 'undefined') {
//       const token = localStorage.getItem('authToken');
//       if (token) {
//         headers.set('Authorization', `Bearer ${token}`);
//       }
//     }
    
//     headers.set('Content-Type', 'application/json');
//     return headers;
//   },
// });

// const customFetchBase: BaseQueryFn<
//   string | FetchArgs,
//   unknown,
//   FetchBaseQueryError
// > = async (args, api, extraOptions) => {
//   let result = await baseQuery(args, api, extraOptions);
  
//   // Handle token refresh or other global error handling here
//   if (result.error && result.error.status === 401) {
//     // Handle unauthorized access
//     if (typeof window !== 'undefined') {
//       localStorage.removeItem('authToken');
//       window.location.href = '/login';
//     }
//   }
  
//   return result;
// };

// export default customFetchBase;
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://159.65.165.21/:8000/api/v1',
  prepareHeaders: (headers, { getState }) => {
    // Add auth token if available
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
    }
    
    // Set default content type
    if (!headers.has('Content-Type')) {
      headers.set('Content-Type', 'application/json');
    }
    
    return headers;
  },
});

const customFetchBase: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  
  // Handle global error responses
  if (result.error && result.error.status === 401) {
    // Handle unauthorized access - redirect to login
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
  }
  
  if (result.error && result.error.status === 403) {
    // Handle forbidden access
    console.error('Access forbidden');
  }
  
  return result;
};

export default customFetchBase;

// ============= EXAMPLE USAGE IN A PAGE =============

