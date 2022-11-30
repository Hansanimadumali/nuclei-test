import {render, screen, fireEvent, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import ContactDetails from '../Components/ContactDetails'
import { MemoryRouter } from 'react-router-dom'

test('loads and display contact details', async () =>{
    // ARRANGE
    render(<MemoryRouter><ContactDetails/></MemoryRouter>);

    // ASSERT
    expect(screen.getByText('Contact details')).toBeInTheDocument();
});


test('loads and display contact details form', async () =>{
    // ARRANGE
    render(<MemoryRouter><ContactDetails/></MemoryRouter>);

    // ASSERT
    expect(screen.getByLabelText('Full name')).toBeInTheDocument();
    expect(screen.getByLabelText('mobile')).toBeInTheDocument();
    expect(screen.getByLabelText('E-mail Address')).toBeInTheDocument();

});

test('show empty input error in Full Name', async () =>{
    // ARRANGE
    render(<MemoryRouter><ContactDetails/></MemoryRouter>);
    const nameFeild = screen.getByTestId('form-fullname');

    // ACT
    fireEvent.change(nameFeild, {target:{value: ""}})
    fireEvent.focusOut(nameFeild)
    expect(screen.getByText("\"name\" is not allowed to be empty")).toBeInTheDocument();

});

test('show error at short Full Name', async () =>{
    // ARRANGE
    render(<MemoryRouter><ContactDetails/></MemoryRouter>);
    const nameFeild = screen.getByTestId('form-fullname');

    // ACT
    fireEvent.change(nameFeild, {target:{value: "ab"}})
    fireEvent.focusOut(nameFeild)
    expect(screen.getByText("\"name\" length must be at least 3 characters long")).toBeInTheDocument();

});

test('show empty input error in telephone', async () =>{
    // ARRANGE
    render(<MemoryRouter><ContactDetails/></MemoryRouter>);
    const mobileField = screen.getByTestId('form-mobile');

    // ACT
    fireEvent.change(mobileField, {target:{value: ""}})
    fireEvent.focusOut(mobileField)
    expect(screen.getByText("\"telephone\" is not allowed to be empty")).toBeInTheDocument();

});

test('show error at short telephone number', async () =>{
    // ARRANGE
    render(<MemoryRouter><ContactDetails/></MemoryRouter>);
    const mobileField = screen.getByTestId('form-mobile');

    // ACT
    fireEvent.change(mobileField, {target:{value: "12"}})
    fireEvent.focusOut(mobileField)
    expect(screen.getByText("Phone number must have 10 digits.")).toBeInTheDocument();

});


test('show error at long telephone number', async () =>{
    // ARRANGE
    render(<MemoryRouter><ContactDetails/></MemoryRouter>);
    const mobileField = screen.getByTestId('form-mobile');

    // ACT
    fireEvent.change(mobileField, {target:{value: "1246546465465465465"}})
    fireEvent.focusOut(mobileField)
    expect(screen.getByText("Phone number must have 10 digits.")).toBeInTheDocument();

});

test('show empty input error in email', async () =>{
    // ARRANGE
    render(<MemoryRouter><ContactDetails/></MemoryRouter>);
    const emailField = screen.getByTestId('form-email');

    // ACT
    fireEvent.change(emailField, {target:{value: ""}})
    fireEvent.focusOut(emailField)
    expect(screen.getByText("\"email\" is not allowed to be empty")).toBeInTheDocument();

});

test('show error at invalid email format', async () =>{
    // ARRANGE
    render(<MemoryRouter><ContactDetails/></MemoryRouter>);
    const emailField = screen.getByTestId('form-email');

    // ACT
    fireEvent.change(emailField, {target:{value: "des"}})
    fireEvent.focusOut(emailField)
    expect(screen.getByText("\"email\" must be a valid email")).toBeInTheDocument();

});