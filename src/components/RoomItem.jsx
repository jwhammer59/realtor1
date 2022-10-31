import React from 'react';
import { Link } from 'react-router-dom';

// Third Party Imports
import Moment from 'react-moment';
import { MdRoom } from 'react-icons/md';
import { FaTrash } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';

export default function RoomItem(room, id, onDelete, onEdit) {
  return (
    <li className="relative bg-white flex flex-col justify-between items-center shadow-md hover:shadow-xl rounded-md overflow-hidden transition-shadow duration-150 m-[10px]">
      <Link to={`/rooms/room/${id}`}>
        <img
          className="h-[340px] w-full object-cover hover:scale-105 transition-scale duration-200 ease-out"
          loading="lazy"
          src={room.imgUrls[0]}
          alt="images"
        />
        <Moment
          className="absolute top-2 left-2 bg-[#3377cc] text-white uppercase text-xs font-semibold rounded-md px-2 py-1 shadow-lg"
          fromNow
        >
          {room.timestamp?.toDate()}
        </Moment>
        <div className="w-full p-[10px]">
          <div className="flex items-center space-x-1">
            <MdRoom className="h-4 w-4 text-green-600" />
            <p className="font-semibold m-0 text-xl">{room.name}</p>
          </div>
        </div>
      </Link>
      {onDelete && (
        <FaTrash
          className="absolute bottom-2 right-2 h-[14px] cursor-pointer text-red-500"
          onClick={() => onDelete(room.id)}
        />
      )}
      {onEdit && (
        <MdEdit className="absolute bottom-2 right-7 h-[14px] cursor-pointer" onClick={() => onEdit(room.id)} />
      )}
    </li>
  );
}
