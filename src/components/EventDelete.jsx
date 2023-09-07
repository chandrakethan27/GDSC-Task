import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

function EventDelete() {
  // Initialize form handling
  const { register, handleSubmit, formState: { errors } } = useForm();

  // Handle form submission
  const onFormSubmit = async (data) => {
    try {
      // Send a POST request to delete an event
      const response = await axios.post('http://localhost:3001/admin/delete', data);
      
      if (response.status === 201) {
        console.log("Event deleted successfully");
      }
    } catch (error) {
      // Handle network errors or other exceptions here
      console.error('Error deleting event:', error.message);
    }
  };

  return (
    <div className="mt-10 m-4"> 
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered input-info w-full max-w-xs text-stone-50"
          {...register("name", { required: true })}
        />
        {errors.name?.type === "required" && (
          <p className='text-red-500'>*Event name cannot be empty</p>
        )}
        <button type="submit" className='btn btn-accent m-4'>Delete Event</button>
      </form>
    </div>
  );
}

export default EventDelete;
