import { useEffect, useState } from 'react';
import { AscDesc, StreamChat } from 'stream-chat';
import {
  Channel,
  ChannelHeader,
  ChannelList,
  Chat,
  LoadingIndicator,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from 'stream-chat-react';
import 'stream-chat-react/dist/css/index.css';
const STREAM_API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const userToken =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoibmFtZWxlc3MtdmlvbGV0LTIifQ.FKMamQsZIsBR4AcOANfuuj7GNUmFeYTKDfsd4Sov1l0';

const filters = { type: 'messaging', members: { $in: ['nameless-violet-2'] } };
const sort: { last_message_at: AscDesc } = { last_message_at: -1 };

const App = () => {
  const [chatClient, setChatClient] = useState(null);
  console.log(process.env.NEXT_PUBLIC_STREAM_API_KEY);

  // Connect multiple users to the same channel (group chat)
  // https://getstream.io/chat/docs/multi-user-channels/

  useEffect(() => {
    const initChat = async () => {
      const client = StreamChat.getInstance(STREAM_API_KEY);

      await client.connectUser(
        {
          id: 'nameless-violet-2',
          name: 'nameless-violet-2',
          image:
            'https://getstream.io/random_png/?id=nameless-violet-2&name=nameless-violet-2',
        },
        userToken
      );

      setChatClient(client);
    };

    initChat();
  }, []);

  if (!chatClient) {
    return <LoadingIndicator />;
  }

  return (
    <Chat client={chatClient} theme="messaging light">
      <ChannelList filters={filters} sort={sort} />
      <Channel>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
    </Chat>
  );
};

export default App;
