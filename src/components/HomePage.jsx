import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const [events, setEvents] = useState([]);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    navigate('/');
  }

  useEffect(() => {
    axios.get('http://localhost:3001/admin/events')
      .then((response) => {
        const eventData = response.data;
        setEvents(eventData);
      })
      .catch((error) => {
        console.error('Error fetching events:', error.message);
      });

    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/'); // Redirect to another route if token is not present
    }
  }, [navigate]);

  const onFormSubmit = async (data) => {
    try {
      // Send a POST request to your backend to create the event
      const id = localStorage.getItem('id');
      data.id = id;

      axios.post('http://localhost:3001/user/eventregister', data)
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            console.log("added");
          }
          if (response.status === 400) {
            alert("already registered");
          }
        });
    } catch (error) {
      // Handle network errors or other exceptions here
      console.error('Error creating event:', error.message);
    }
  };

  return (
    <div>
      <h1>
        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-5xl font-bold">Hello there!</h1>
              <p className="py-6">Welcome to Register Event! Scroll down or click on button to register</p>

              <button className="btn btn-primary">Get Started</button>
            </div>
          </div>
        </div>
      </h1>
      <div>
        <h2 className='text-3xl m-7'>All Events</h2>
        <ul>
          {events.map((event) => (
            <li key={event.id}>
              <div className="card w-96 bg-primary text-primary-content m-7">
                <div className="card-body">
                  <h2 className="card-title">{event.name}</h2>
                  <p>Exciting event ahead! Do register!</p>
                  <div className="card-actions justify-end">
                    <button className="btn">Know More</button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div>
          <div className="mt-10">
            <form onSubmit={handleSubmit(onFormSubmit)}>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered input-info w-full max-w-xs text-stone-50 m-7"
                {...register("name", { required: true })}
              />
              {errors.name?.type === "required" && (
                <p className='text-red-500'>*event cannot be empty</p>
              )}
              <button type="submit" className='btn btn-accent '>Register</button>
            </form>
          </div>
          <button onClick={handleLogout} className="btn btn-error m-7">Logout</button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
