import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AxiosComponent = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!data) {
    return <p>No data to display.</p>;
  }

  return (
    <div className='api-component'>
      <table className="api-table" border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>User ID</th>
            <th>ID</th>
            <th>Title</th>
            <th>Body</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr key={user.id}>
              <td>{user.userId}</td>
              <td>{user.id}</td>
              <td>{user.title}</td>
              <td>{user.body}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AxiosComponent;
