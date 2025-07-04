import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { UserIcon, ArrowRightEndOnRectangleIcon } from '@heroicons/react/24/solid';
import { toast } from 'sonner';


const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        toast("Logged out");
        navigate('/login');
    };

    return (
        <nav className="bg-blue-900 text-white px-6 py-5 shadow flex items-center justify-between">
            <div className="text-2xl font-bold">Leave Manager</div>

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm font-medium">
                    <UserIcon className="h-5 w-5 text-white" />
                    <span>{user?.name}</span>
                </div>
                {!user ? (<Link to='/login' className="flex items-center gap-1 bg-white text-purple-700 font-semibold px-3 py-1 rounded hover:bg-purple-100">Login</Link>) : (<button
                    onClick={handleLogout}
                    className="flex items-center gap-1 bg-white text-purple-700 font-semibold px-3 py-1 rounded hover:bg-purple-100"
                >
                    <ArrowRightEndOnRectangleIcon className="h-5 w-5" />
                    Logout
                </button>)}


            </div>
        </nav>
    );
};

export default Navbar;
