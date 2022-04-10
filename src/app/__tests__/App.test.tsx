import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen, setupMockServer, waitFor, act } from '../../../__mock__/test-utils';
import App from '../App';
import { store } from '../../store';

setupMockServer();

/**
 * Debounce delay wait time - mock
 * @return Promise - resolve on timeout 1sec 
 */
const sleep = () => new Promise(resolve => {
  setTimeout(resolve, 1000);
});

describe('Integration Test - App', () => {
  it(`Tests App flow`, async () => {
    const user = userEvent.setup()

    render(<App />);

    await act( async () => {
        // Initial page renders with Search component and no suggestions content
        expect(screen.getByPlaceholderText(/Search a github user name/i)).toBeInTheDocument();
        expect(screen.queryByText(/No Suggestions/i)).toBeInTheDocument();
    });

    // User event - key-in / type search query
    await user.type(screen.getByPlaceholderText(/Search a github user name/i), `test-123`);
    // sleep to - replicate debounce delayvalue
    await act(async () => {
      await sleep();
    });
    await waitFor(async () => {
      expect(screen.getByPlaceholderText(/Search a github user name/i)).toHaveValue(`test-123`);
      expect(screen.queryByText(/No Suggestions/i)).not.toBeInTheDocument();
      // Assert no of search result in store - Mock api data length is 3
      expect(store.getState().githubUserSearch.queryResultOrSessions).toHaveLength(3);
    });
    
    // Clear user input to test the clearning the result list and store
    await user.clear(screen.getByPlaceholderText(/Search a github user name/i));
    expect(screen.getByPlaceholderText(/Search a github user name/i)).toHaveValue(``);

    // User event - key-in / type search query
    await user.type(screen.getByPlaceholderText(/Search a github user name/i), `test-123`);
    // sleep to - replicate debounce delayvalue
    await act(async () => {
      await sleep();
    });
    await act(async () => {
      expect(screen.getByPlaceholderText(/Search a github user name/i)).toHaveValue(`test-123`);
      expect(screen.queryAllByRole(`listitem`)).toHaveLength(3);
      // Assert no of search result in store - Mock api data length is 3
      expect(store.getState().githubUserSearch.queryResultOrSessions).toHaveLength(3);
    });

    // Select one user and go to profile
    await user.click(screen.queryAllByRole(`listitem`)[0]);

    await waitFor(async () => {
      // Assert routes to new page /users/:id
      expect(window.location.pathname).toEqual(`/users/test-123`);
      expect((screen.getByTestId(`loginid`) as HTMLAnchorElement).innerHTML).toContain(`test-123`);
      expect(screen.queryByText(/Test User/i)).toBeInTheDocument();
      // List of repos - mock api repo length - 10
      expect(store.getState().user.listOfGitRepositories).toHaveLength(10);
      expect(screen.queryAllByRole(`listitem`)).toHaveLength(10);
    });

    // Click repo - test-123 (index - 0) to go to detail page
    await user.click(screen.queryAllByRole(`listitem`)[0]);
    const repository = store.getState().user.listOfGitRepositories[0];

    await waitFor(async () => {
      // Assert routes to new page /users/:id/repo/selected-repo-name
      expect(window.location.pathname).toEqual(`/users/test-123/repo/${repository.name}`);
       // repository file tree length - mock api repo length - 30
      expect(store.getState().githubRepository.githubRepoTree).toHaveLength(30);
    });
  });
});
