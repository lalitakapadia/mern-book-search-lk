import React from 'react';
import {
  Container,
  Card,
  Button,
  Col,
  Row
} from 'react-bootstrap';

// import { getMe, deleteBook } from '../utils/API';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { REMOVE_BOOK } from '../utils/mutations';
import { removeBookId } from '../utils/localStorage';
import Auth from '../utils/auth';

const SavedBooks = () => {

  const { loading, data } = useQuery(GET_ME);
  console.log("Saved books" + JSON.stringify(data));
  const [removeBook] = useMutation(REMOVE_BOOK);

  const userData = data?.me || {};

  const handleDeleteBook = async (bookId) => {
    console.log('Book to be deleted' + bookId);
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const response = await removeBook({ variables: { bookId } });
      console.log('Deleted record: ', response);
      removeBookId(bookId);
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
       <div className='text-light bg-dark'>
            <h3>Viewing saved books!</h3>
       </div>  
      <Container>
        <h2>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${
                userData.savedBooks.length === 1 ? 'book' : 'books'
              }:`
            : 'You have no saved books!'}
        </h2>
        <Row>
            {userData.savedBooks.map((book) => {
              return (
                <Col xs={12} md={8} lg={4} key={book.bookId}>
                  <Card key={book.bookId} border="dark">
                    {book.image ? (
                      <Card.Img
                        src={book.image}
                        alt={`The cover for ${book.title}`}
                        variant="top"
                      />
                    ) : null}
                    <Card.Body>
                      <Card.Title>{book.title}</Card.Title>
                      <p className="small">Authors: {book.authors}</p>
                      <Card.Text>{book.description}</Card.Text>
                      <Button
                        className="btn-block btn-danger"
                        onClick={() => handleDeleteBook(book.bookId)}
                      >
                        Delete this Book!
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;
