import { render, screen } from '@testing-library/react';
import App from './App';
import { Provider} from 'react-redux'
import configureStore from './store/configureStore';

test('renders learn react link', () => {
  const store = configureStore()
  //let store = mockStore(ini)

  render(<Provider store={store}><App /></Provider>);
  const linkElement = screen.getByText("Covid-19 Patient Tracker");
  expect(linkElement).toBeInTheDocument();
});
