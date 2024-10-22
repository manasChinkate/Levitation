import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import RegisterImage from '../assets/RegisterImage.png';

const Login = () => {

    type Inputs={
        
        email:string,
        password:string
    }
    // useForm hook
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm<Inputs>()

    // Submit handler
    const onSubmit = (data) => {
        console.log('Form data:', data);
        reset()
    };

    return (
        <div className="h-full w-full flex justify-evenly">
            <div className="lg:flex items-center justify-center hidden ">
                <img className='h-[500px]' src={RegisterImage} alt="Register" />
            </div>
            <div className="flex items-center justify-center">
                <div className='flex flex-col gap-4 sm:w-[500px] w-auto p-8'>
                    <div className='flex flex-col gap-3'>
                        <h1 className='text-white text-2xl font-semibold'>
                        Let the Journey Begin!
                        </h1>
                        <h3 className='text-[#A7A7A7] text-[12px] w-72 font-light'>
                        This is basic login page which is used for levitation assignment purpose.                         </h3>
                    </div>
                    <div>
                        <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
                           

                            <div className='flex flex-col gap-2'>
                                <label className='text-white text-sm'>Email Address</label>
                                <input
                                    className={`border ${errors.email ? 'border-red-500' : 'border-[#424647]'} p-2 rounded-sm text-[12px] text-[#707070] bg-[#202020] placeholder:text-[12px] placeholder:text-[#707070]`}
                                    type="text"
                                    placeholder='Enter Email ID'
                                    {...register('email', {
                                        required: 'Email is required',
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: 'Please enter a valid email address'
                                        }
                                    })}
                                />
                                {errors.email && <p className='text-red-500 text-[12px]'>{errors.email.message}</p>}
                                <label className='text-[12px] text-[#A7A7A7]'>This email will be displayed with your inquiry</label>
                            </div>

                            <div className='flex flex-col gap-2'>
                                <label className='text-white text-sm'>Current Password</label>
                                <input
                                    className={`border ${errors.password ? 'border-red-500' : 'border-[#424647]'} p-2 rounded-sm text-[12px] text-[#707070] bg-[#202020] placeholder:text-[12px] placeholder:text-[#707070]`}
                                    type="password"
                                    placeholder='Enter the Password'
                                    {...register('password', {
                                        required: 'Password is required',
                                        pattern: {
                                            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                                            message: 'Password must be 8+ characters with letters and numbers.'
                                        }
                                    })}
                                />
                                {errors.password && <p className='text-red-500 text-[12px]'>{errors.password.message}</p>}
                                
                            </div>

                            <div className='flex items-center gap-3'>
                                <button className='bg-[#303030] text-[12px] p-2 px-3 rounded-md text-[#C9F274]' type="submit">
                                    Login Now
                                </button>

                                <Link to={'/Login'}>
                                    <p className="text-[#A7A7A7] text-[12px] hover:underline">Forgot Password ?</p>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;