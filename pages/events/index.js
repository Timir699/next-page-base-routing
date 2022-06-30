import { useRouter } from 'next/router';
import React from 'react';
import EventList from '../../components/events/EventList';
import EventsSearch from '../../components/events/EventsSearch';
import { getAllEvents } from '../../helpers/api.util';

const AllEventsPage = (props) => {
    console.log(props);
    const {events} = props
    const router = useRouter();

    const findEventsHandler = (year, month) => {
        const fullPath = `/events/${year}/${month}`;
        router.push(fullPath);
    };

   

    return (
        <div>
            <EventsSearch onSearch={findEventsHandler} />
            <EventList items={events} />
        </div>
    );
};

export async function getStaticProps() {
    const events = await getAllEvents()

   

    return {
        props : {
            events : events,
        },
        revalidate: 60
    }
}

export default AllEventsPage;
