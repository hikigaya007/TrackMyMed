import React from 'react';
import { NavLink } from 'react-router-dom';

function Sidebar() {
    const navLinkStyle = ({ isActive }) => {
        return {
          fontWeight: isActive ? "600" : "",
          color: isActive ? "white" : "",
          backgroundColor: isActive ? "black" : "",
          
        };
      };

    const sidebardata = [
        {
            title: "Resident",
            link: "/resident",
            icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13Z"></path></svg>
        },
        {
            title: "Medication",
            link: '/medication',
            icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M17 5V7C18.6569 7 20 8.34315 20 10V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V10C4 8.34315 5.34315 7 7 7V5H17ZM13 11H11V13H9V15H10.999L11 17H13L12.999 15H15V13H13V11ZM19 2V4H5V2H19Z"></path></svg>
        },
        {
            title: "Administration",
            link: '/administration',
            icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 14V22H4C4 17.5817 7.58172 14 12 14ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM14.5946 18.8115C14.5327 18.5511 14.5 18.2794 14.5 18C14.5 17.7207 14.5327 17.449 14.5945 17.1886L13.6029 16.6161L14.6029 14.884L15.5952 15.4569C15.9883 15.0851 16.4676 14.8034 17 14.6449V13.5H19V14.6449C19.5324 14.8034 20.0116 15.0851 20.4047 15.4569L21.3971 14.8839L22.3972 16.616L21.4055 17.1885C21.4673 17.449 21.5 17.7207 21.5 18C21.5 18.2793 21.4673 18.551 21.4055 18.8114L22.3972 19.3839L21.3972 21.116L20.4048 20.543C20.0117 20.9149 19.5325 21.1966 19.0001 21.355V22.5H17.0001V21.3551C16.4677 21.1967 15.9884 20.915 15.5953 20.5431L14.603 21.1161L13.6029 19.384L14.5946 18.8115ZM18 17C17.4477 17 17 17.4477 17 18C17 18.5523 17.4477 19 18 19C18.5523 19 19 18.5523 19 18C19 17.4477 18.5523 17 18 17Z"></path></svg>
        }
    ];

    return (
        <div className="flex h-full">
            <div className="flex flex-col h-full min-h-screen w-[200px] border-e border-e-black bg-green-500">
                <ul className="flex-grow">
                    {sidebardata.map((item, index) => (
                        <li key={index} className="w-full h-[70px] p-1 pt-5">
                            <NavLink 
                            style={navLinkStyle}
                            to={item.link}
                             className="flex p-2 gap-2 items-center">
                                <div className="size-7">{item.icon}</div>    
                                <div className="font-semibold">{item.title}</div>    
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;
