import { gql } from '@apollo/client';
import { IMessage } from 'react-native-gifted-chat';
import { User, USER_FRAGMENT } from './users';

export type Chat = {
  _id: string;
  you: User;
  other: User;
  messages: IMessage[];
};

export type ChatMessage = {
  id: string;
  text: string;
  user: string;
};

export const CHAT_MESSAGE_FRAGMENT = gql`
  fragment ChatMessageFragment on ChatMessage {
    id
    user
    text
  }
`;

export const GET_CHATS = gql`
  query {
    chats {
      _id
      you {
        ...UserFragment
      }
      other {
        ...UserFragment
      }
      messages {
        ...ChatMessageFragment
      }
    }
  }

  ${USER_FRAGMENT}
  ${CHAT_MESSAGE_FRAGMENT}
`;

export const ADD_MESSAGE = gql`
  mutation ($messageId: String!, $chatId: ID!, $text: String!) {
    chat: addMessage(messageId: $messageId, chatId: $chatId, text: $text) {
      _id
      you {
        ...UserFragment
      }
      other {
        ...UserFragment
      }
      messages {
        ...ChatMessageFragment
      }
    }
  }

  ${USER_FRAGMENT}
  ${CHAT_MESSAGE_FRAGMENT}
`;

export const GET_CHAT = gql`
  query ($id: ID!) {
    chat(id: $id) {
      _id
      you {
        ...UserFragment
      }
      other {
        ...UserFragment
      }
      messages {
        ...ChatMessageFragment
      }
    }
  }

  ${USER_FRAGMENT}
  ${CHAT_MESSAGE_FRAGMENT}
`;
