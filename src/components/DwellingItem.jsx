import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { MdLocationPin } from 'react-icons/md';
import { FaTrash } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';

export default function DwellingItem({ dwelling, id, onDelete, onEdit }) {
  return (
    <li className="relative bg-white flex flex-col justify-between items-center shadow-md hover:shadow-xl rounded-md overflow-hidden transition-shadow duration-150 m-[10px]">
      <Link to={`/dwelling/${id}`}>
        <img
          className="h-[340px] w-full object-cover hover:scale-105 transition-scale duration-200 ease-out"
          loading="lazy"
          src={dwelling.imgUrls[0]}
          alt="images"
        />
        <Moment
          className="absolute top-2 left-2 bg-[#3377cc] text-white uppercase text-xs font-semibold rounded-md px-2 py-1 shadow-lg"
          fromNow
        >
          {dwelling.timestamp?.toDate()}
        </Moment>
        <div className="w-full p-[10px]">
          <div className="flex items-center space-x-1">
            <MdLocationPin className="h-4 w-4 text-green-600" />
            <p className="font-semibold text-sm mb-[2px] text-gray-600 truncate">{dwelling.address}</p>
          </div>
          <p className="font-semibold m-0 text-xl">{dwelling.name}</p>
          <p className=" text-[#457b9d] mt-2 font-semibold">
            ${dwelling.cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          </p>
          <div className="flex items-center mt-[10px] space-x-3">
            <div className="flex items-center space-x-1">
              <p className="font-bold text-xs">{dwelling.bedrooms > 1 ? `${dwelling.bedrooms} Beds ` : '1 Bed'}</p>
            </div>
            <div className="font-bold text-xs">
              <p>{dwelling.bathrooms > 1 ? `${dwelling.bathrooms} Baths ` : '1 Bath'}</p>
            </div>
          </div>
        </div>
      </Link>
      {onDelete && (
        <FaTrash
          className="absolute bottom-2 right-2 h-[14px] cursor-pointer text-red-500"
          onClick={() => onDelete(dwelling.id)}
        />
      )}
      {onEdit && (
        <MdEdit className="absolute bottom-2 right-7 h-[14px] cursor-pointer" onClick={() => onEdit(dwelling.id)} />
      )}
    </li>
  );
}
