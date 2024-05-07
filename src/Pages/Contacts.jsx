import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Popup from "../Components/Popup";
import { removeContact } from "../Redux/action";

const Contacts = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [singleContact, setSingleContact] = useState({});
  let data = undefined;
  const AllContacts = useSelector((store) => store.contacts);
  const dispatch = useDispatch();

  const togglePopup = (contact) => {
    setSingleContact(contact);

    setIsOpen(!isOpen);
  };
  useEffect(() => {}, [dispatch, AllContacts.length]);
  return (
    <div className="justify-center pt-12 text-gray-50   p-4  w-full ">
      <div className="m-4">
        <button className="mt-24 rounded-lg bg-slate-300 text-black p-2 text-xl">
          <Link to="/contact_form">Create Contact</Link>
        </button>
      </div>
      {AllContacts.length == 0 && (
        <div className=" m-auto mt-32 w-fit p-4 align-middle text-black justify-center">
          <h1 className="text-3xl">
            No Contact Found !!! <br />
            Please add contact using Create Contact Button
          </h1>
        </div>
      )}
      <div
        id="contact_list"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {AllContacts.map((el) => {
          return (
            <div
              key={el.id}
              className="bg-gray-400 rounded-lg shadow-md m-4 p-4 text-black"
            >
              <div onClick={() => togglePopup(el)} className="w-3/4 m-auto  ">
                <img
                  className="w-full rounded-full"
                  src="https://www.pngitem.com/pimgs/m/581-5813504_avatar-dummy-png-transparent-png.png"
                  alt=""
                />
                <div className="p-4">
                  {isOpen && (
                    <Popup close={() => togglePopup(data)} el={singleContact} />
                  )}
                </div>{" "}
                <div className="text-left">
                  <p>First Name : {el.first_name}</p>
                  <p>Last Name : {el.last_name}</p>
                  {/* <p>Mobile : {el.mob}</p> */}
                  <p>
                    Status : {el.status == "active" ? "Active" : "Inactive"}
                  </p>
                </div>
              </div>

              <div className="flex justify-between my-2">
                <Link to={`edit/${el.id}`}>
                  <button className="rounded p-2 bg-green-300 text-black">
                    Edit
                  </button>
                </Link>

                <button
                  onClick={() => dispatch(removeContact(el.id))}
                  className="rounded p-2 bg-red-400 text-black"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Contacts;
