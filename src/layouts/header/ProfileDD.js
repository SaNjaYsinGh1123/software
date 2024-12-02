import React from 'react';
import { DropdownItem } from 'reactstrap';
import { User, FileText, Star, Settings, Droplet } from 'react-feather';
import user5 from '../../assets/images/users/user4.jpg';
import {useAuth} from '../../views/auth/AuthContext';

const ProfileDD = () => {
  const {authUser} = useAuth();
  console.log('authUser',authUser);
  return (
    <div>
      <div className="d-flex gap-3 p-3 border-bottom pt-2 align-items-center">
        <img src={user5} alt="user" className="rounded-circle" width="55" />
        <span>
          <h5 className="mb-0 fw-medium">user</h5>
          <small className='text-muted'>{authUser}</small>
        </span>
      </div>
      <DropdownItem className="px-4 py-3">
        <User size={20} className="text-muted" />
        &nbsp; My Profile
      </DropdownItem>
      <DropdownItem className="px-4 py-3">
        <FileText size={20} className="text-muted" />
        &nbsp; Edit Profile
      </DropdownItem>
      <DropdownItem className="px-4 py-3">
        <Star size={20} className="text-muted" />
        &nbsp; My Balance
      </DropdownItem>
      <DropdownItem className="px-4 py-3">
        <Droplet size={20} className="text-muted" />
        &nbsp; Customize
      </DropdownItem>
      <DropdownItem divider />
      <DropdownItem className="px-4 py-3">
        <Settings size={20} className="text-muted" />
        &nbsp; Settings
      </DropdownItem>
      <DropdownItem divider />
    </div>
  );
};

export default ProfileDD;
