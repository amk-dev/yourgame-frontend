import axios from 'axios'

export async function getLiveStreams(token) {
	axios.get(
		'https://youtube.googleapis.com/youtube/v3/liveBroadcasts?part=snippet%2CcontentDetails%2Cstatus&broadcastStatus=active',
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	)
}
