import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { adminLogin } from '../slices/adminSlice';

function AdminLogin() {
  // Initialize form handling
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  // Initialize navigation hook
  const navigate = useNavigate();

  // Initialize dispatch
  const dispatch = useDispatch();

  // Handle form submission
  const onFormSubmit = async (info) => {
    try {
      // Dispatch admin login action
      const user = await dispatch(adminLogin(info));

      // If login is successful, navigate to '/create'
      if (user.meta.requestStatus === 'fulfilled') {
        navigate('/create');
      }
    } catch (error) {
      // Log and handle login failure
      console.error('Login failed:', error);
      navigate('/');
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Admin Login</h1>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <form onSubmit={handleSubmit(onFormSubmit)}>
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
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
