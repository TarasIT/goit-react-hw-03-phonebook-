import PropTypes from 'prop-types';
import { Contact, ContactsDeleteBtn, Item } from './ContactItem.styled';

export const ContactItem = ({ contacts, deleteContact }) => {
  return contacts.map(({ name, id, number }) => {
    return (
      <Item key={id}>
        <Contact>
          {name}: {number}
        </Contact>
        <ContactsDeleteBtn
          type="button"
          name={id}
          onClick={e => deleteContact(e.target.name)}
        >
          Delete
        </ContactsDeleteBtn>
      </Item>
    );
  });
};

ContactItem.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  deleteContact: PropTypes.func.isRequired,
};
