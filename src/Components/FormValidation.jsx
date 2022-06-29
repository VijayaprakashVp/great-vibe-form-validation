import React, { useState } from "react";
import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const FormValidation = () => {
  const [data, setData] = useState([]);
  const [formValues, setFormValues] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [reload, setReload] = useState(false);
  console.log(data);

  ///////////////////////////////////////////////////////////

  // ○ Name - required
  // ○ Email - required
  // ○ Mobile
  // ○ Country
  // ○ City
  // ○ State
  // ○ Message

  ///////////////////////////////////////////////////////////

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }

    fetch(`https://62bcc1f36b1401736c0071b5.mockapi.io/Users`)
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => console.log(err));
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    if (!values.username) {
      errors.username = "Username is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    }
    return errors;
  };

  // https://great-vibe.herokuapp.com/users

  const handleFormSubmit = () => {
    if (isSubmit == true) {
      fetch(`https://62bcc1f36b1401736c0071b5.mockapi.io/Users`, {
        method: "POST",
        body: JSON.stringify(formValues),
        headers: {
          "Content-type": "Application/json",
        },
      });
      setReload(!reload);
    }
    alert("Registered");
    // else alert("something went wrong");
  };

  return (
    <div className="container">
      <h1
        style={{
          color: "black",
          outline: "1px solid lightblue",
          borderRadius: "5px",
          backgroundColor: "grey",
        }}
      >
        Register Form{" "}
        {showForm ? (
          <span>
            <button
              className="button-18"
              onClick={() => setShowForm(!showForm)}
            >
              ShowForm
            </button>
          </span>
        ) : (
          ""
        )}
      </h1>{" "}
      {showForm ? (
        <table style={{ color: "white", backgroundColor: "black" }}>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Mobile</th>
            <th>Email</th>
            <th>City</th>
            <th>State</th>
            <th>Country</th>
            <th>Message</th>
          </tr>
          {data.map((e, i) => (
            <tr>
              <td>{i + 1}</td>
              <td>{e.name}</td>
              <td>{e.mobile}</td>
              <td>{e.email}</td>
              <td>{e.city}</td>
              <td>{e.state}</td>
              <td>{e.country}</td>
              <td>{e.message}</td>
            </tr>
          ))}
        </table>
      ) : (
        <form onSubmit={handleSubmit}>
          <br />
          <div className="eachinput form">
            <div className="field">
              <label>Username : </label>
              <input
                type="text"
                name="name"
                placeholder="Username"
                value={formValues.username}
                onChange={handleChange}
              />
            </div>
            <p>{formErrors.username}</p>
            <div className="field">
              <label>E-mail : </label>
              <input
                type="text"
                name="email"
                placeholder="Email"
                value={formValues.email}
                onChange={handleChange}
              />
            </div>
            <p>{formErrors.email}</p>
            <div className="field">
              <label>Mobile : </label>
              <input
                type="tel"
                name="mobile"
                placeholder="Mobile Number"
                value={formValues.mobile}
                onChange={handleChange}
              />
            </div>
            <p style={{ visibility: "hidden" }}></p>
            <div className="field">
              <label>Country : </label>
              <input
                type="text"
                name="country"
                placeholder="Country"
                value={formValues.country}
                onChange={handleChange}
              />
            </div>
            <p style={{ visibility: "hidden" }}></p>
            <div className="field">
              <label>State : </label>
              <input
                type="text"
                name="state"
                placeholder="State"
                value={formValues.state}
                onChange={handleChange}
              />
            </div>
            <p style={{ visibility: "hidden" }}></p>
            <div className="field">
              <label>City : </label>
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formValues.city}
                onChange={handleChange}
              />
            </div>
            <p style={{ visibility: "hidden" }}></p>
            <div className="field">
              <label>Message : </label>
              <input
                type="textarea"
                name="message"
                placeholder="Message"
                value={formValues.message}
                onChange={handleChange}
              />
            </div>
            <br />
            <button class="button-18" role="button" onClick={handleFormSubmit}>
              Submit
            </button>
            <span>
              <button
                style={{ marginLeft: "50px" }}
                class="button-18"
                onClick={() => setShowForm(!showForm)}
              >
                Show Users
              </button>
            </span>
          </div>
        </form>
      )}
    </div>
  );
};

export default FormValidation;
