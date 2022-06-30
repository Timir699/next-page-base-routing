import EventList from '../components/events/EventList';
import EventsSearch from '../components/events/EventsSearch';
import { getFeaturedEvents } from '../helpers/api.util';
import { useRouter } from 'next/router';

export default function Home(props) {
   

    return (
        <>
            
            <EventList items={props.featuredEvents} />
        </>
    );
}

export async function getStaticProps() {
    const featuredEvents = await getFeaturedEvents();
    return {
        props: {
            featuredEvents: featuredEvents,
        },
        revalidate: 1800
    };
}
