import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userLogin } from '../slices/userSlice';

function LoginPage() {
  // Initialize react-hook-form
  const { register, handleSubmit, formState: { errors } } = useForm();

  // Get the navigation function from the router
  const navigate = useNavigate();
  
  // Get the dispatch function from Redux
  const dispatch = useDispatch();

  // Effect hook to check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/event');
    }
  }, [navigate]);

  // Function to handle form submission
  const onFormSubmit = async (info) => {
    try {
      const user = await dispatch(userLogin(info));

      if (user.meta.requestStatus === 'fulfilled') {
        navigate('/event');
      }
    } catch (error) {
      console.error('Login failed:', error);
      navigate('/');
    }
  };

  // Function to redirect to admin page
  const redirect = () => {
    navigate('/admin');
  }

  // Function to redirect to register page
  const redirect1 = () => {
    navigate('/register');
  }

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content ">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold"> Log in</h1>
          <form className="mt-6" onSubmit={handleSubmit(onFormSubmit)}>
            {/* Email Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                placeholder="email"
                className="input input-bordered"
                {...register("email", { required: true })}
              />
              {errors.email?.type === "required" && (
                <p className="text-red-500">*Email required</p>
              )}
            </div>
            {/* Password Input */}
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                {...register('password', { required: true })}
              />
              {errors.password?.type === "required" && (
                <p className="text-red-500">*Password required</p>
              )}
            </div>
            {/* Submit Button */}
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
          {/* Admin Button */}
          <button onClick={redirect} className="btn btn-outline mt-4">Admin</button>
          {/* Register Button */}
          <button onClick={redirect1} className="btn btn-outline mt-4 mx-4">Register</button>
        </div>

      </div>
    </div>
  );
}

export default LoginPage;
