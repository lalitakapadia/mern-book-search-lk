import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const SignupForm = () => {
  // set initial form state
  const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });
  const [addUser, {error}] = useMutation(ADD_USER);

  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);

  

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    console.log('client validation passed');

    try {
      const { data } = await addUser({
        variables: { ...userFormData }
      });

      console.log('user is created successfully' + JSON.stringify(data));
     

      // const { token, user } = await data.json();
      Auth.login(data.addUser.token);
      console.log(user);
      Auth.login(token);

    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      username: '',
      email: '',
      password: '',
    });
  };

  return (
    <>
    <div className="col-12 col-lg-10">
      {/* This is needed for the validation functionality above */}
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        {/* show alert if server response is bad */}
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your signup!
        </Alert>

        <Form.Group className='mb-3'>
          <Form.Label htmlFor='username'>Username</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your username'
            name='username'
            onChange={handleInputChange}
            value={userFormData.username}
            required
          />
          <Form.Control.Feedback type='invalid'>Username is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label htmlFor='email'>Email</Form.Label>
          <Form.Control
            type='email'
            placeholder='Your email address'
            name='email'
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label htmlFor='password'>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Your password'
            name='password'
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
        </Form.Group>
        <Button
          disabled={!(userFormData.username && userFormData.email && userFormData.password)}
          type='submit'
          variant='success'>
          Submit
        </Button>
      </Form>
    </div>
      
    </>
  );
};

export default SignupForm;



// import { useState } from 'react';
// import { Form, Button, Alert } from 'react-bootstrap';
// //import { Link } from 'react-router-dom';

// import { useMutation } from '@apollo/client';
// import { ADD_USER } from '../utils/mutations';

// import Auth from '../utils/auth';

// const SignupForm = () => {
 
//   const [formState, setFormState] = useState({
//     username: '',
//     email: '',
//     password: '',
//   });
  
//   const [addUser, {error}] = useMutation(ADD_USER);
//   // set state for form validation
//   const [validated, setValidated] = useState(false);
//   // set state for alert
//   const [showAlert, setShowAlert] = useState(false);

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     console.log(name, value);
//     setFormState({
//       ...formState,
//       [name]: value,
//     });
//   };


//   const handleFormSubmit = async (event) => {
//     event.preventDefault();
//     console.log(formState);
//     // const form = event.currentTarget;
//     // if (form.checkValidity() === false) {
//     //   event.preventDefault();
//     //   event.stopPropagation();
//     // }

//     setValidated(true);

//     try {
//       const { data } = await addUser({
//         variables: { ...formState },
//       });

//       Auth.login(data.addUser.token);
//     } catch (e) {
//       console.error(e);
//     }
//   };

//   return (
//     <>
//       {/* This is needed for the validation functionality above */}
//       <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
//         {/* show alert if server response is bad */}
//         <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
//           Something went wrong with your signup!
//         </Alert>

//         <Form.Group>
//           <Form.Label htmlFor='username'>Username</Form.Label>
//           <Form.Control
//             type='text'
//             placeholder='Your username'
//             name='username'
//             onChange={handleChange}
//             value={formState.username}
//             required
//           />
//           <Form.Control.Feedback type='invalid'>Username is required!</Form.Control.Feedback>
//         </Form.Group>

//         <Form.Group>
//           <Form.Label htmlFor='email'>Email</Form.Label>
//           <Form.Control
//             type='email'
//             placeholder='Your email address'
//             name='email'
//             onChange={handleChange}
//             value={formState.email}
//             required
//           />
//           <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
//         </Form.Group>

//         <Form.Group>
//           <Form.Label htmlFor='password'>Password</Form.Label>
//           <Form.Control
//             type='password'
//             placeholder='Your password'
//             name='password'
//             onChange={handleChange}
//             value={formState.password}
//             required
//           />
//           <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
//         </Form.Group>
//         <Button
//           disabled={!(formState.username && formState.email && formState.password)}
//           type='submit'
//           variant='success'>
//           Submit
//         </Button>
//       </Form>
//       {error && (
//           <div className="my-3 p-3 bg-danger text-white">
//             {error.message}
//           </div>
//         )}
//     </>
//   );
// };

// //   return (
// //     <main className="flex-row justify-center mb-4">
// //       <div className="col-12 col-lg-10">
// //         <div className="card">
// //           <h4 className="card-header bg-dark text-light p-2">Sign Up</h4>
// //           <div className="card-body">
// //             {data ? (
// //               <p>
// //                 Success! You may now head{' '}
// //                 <Link to="/">back to the homepage.</Link>
// //               </p>
// //             ) : (
// //               <form onSubmit={handleFormSubmit}>
// //                 <input
// //                   className="form-input"
// //                   placeholder="Your username"
// //                   name="username"
// //                   type="text"
// //                   value={formState.name}
// //                   onChange={handleChange}
// //                 />
// //                 <input
// //                   className="form-input"
// //                   placeholder="Your email"
// //                   name="email"
// //                   type="email"
// //                   value={formState.email}
// //                   onChange={handleChange}
// //                 />
// //                 <input
// //                   className="form-input"
// //                   placeholder="******"
// //                   name="password"
// //                   type="password"
// //                   value={formState.password}
// //                   onChange={handleChange}
// //                 />
// //                 <button
// //                   className="btn btn-block btn-primary"
// //                   style={{ cursor: 'pointer' }}
// //                   type="submit"
// //                 >
// //                   Submit
// //                 </button>
// //               </form>
// //             )}

// //             {error && (
// //               <div className="my-3 p-3 bg-danger text-white">
// //                 {error.message}
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     </main>
// //   );
// // };

// export default SignupForm;
