import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  // Initialize state for form data
  const [data, setData] = useState([]);

  // Initialize react-hook-form
  const { register, handleSubmit, formState: { errors } } = useForm();

  // Get the navigation function from the router
  const navigate = useNavigate();

  // Function to handle form submission
  const onFormSubmit = (info) => {
    setData([...data, info]);
    console.log(data);

    // Send a POST request to your backend to register the user
    axios.post('http://localhost:3001/user/register', info)
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          navigate('/');
        }
      })
      .catch((error) => {
        console.error(`Error: ${error.message}`);
        alert(`Error: ${error.message}`);
      });
  };

  return (
    <div className=''>
      <p className="text-4xl text-center ">Sign Up</p>
      <div className='flex justify-center mt-18 '>
        <div className=' mt-10 border border-blue-300 rounded-lg mb-10 px-20'>
          <div className='max-p-5 text-xl text-center'>
            <form action="" className='' onSubmit={handleSubmit(onFormSubmit)}>
              {/* First Name Input */}
              <div className='p-5'>
                <p className='m-3 font-bold'>First Name</p>
                <input
                  type="text"
                  className="input input-bordered input-info w-full max-w-xs"
                  {...register("firstName", { required: true })}
                />
                {errors.firstName?.type === "required" && (
                  <p className='text-red-500'>*First Name is required</p>
                )}
              </div>

              {/* Last Name Input */}
              <div className='p-5'>
                <p className='m-3 font-bold'>Last Name</p>
                <input
                  type="text"
                  className="input input-bordered input-info w-full max-w-xs"
                  {...register("lastName", { required: true })}
                />
                {errors.lastName?.type === "required" && (
                  <p className='text-red-500'>*Last Name is required</p>
                )}
              </div>

              {/* Username (Email) Input */}
              <div className='p-5'>
                <p className='m-3 font-bold'>Username</p>
                <input
                  type="email"
                  className="input input-bordered input-info w-full max-w-xs"
                  {...register("email", { required: true })}
                />
                {errors.email?.type === "required" && (
                  <p className='text-red-500'>*Invalid Username</p>
                )}
              </div>

              {/* Password Input */}
              <div className='p-5'>
                <p className='m-3 font-bold'>Password</p>
                <input
                  type="password"
                  className="input input-bordered input-info w-full max-w-xs"
                  {...register("password", { required: true, minLength: 5 })}
                />
                {errors.password?.type === "required" && (
                  <p className='text-red-500'>*Password is required</p>
                )}
                {errors.password?.type === "minLength" && (
                  <p className='text-red-500'>*Minimum 5 characters</p>
                )}
              </div>

              <br />
              <button className='btn btn-info m-4'>
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
