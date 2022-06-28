import Head from 'next/head';
import Image from 'next/image';
import EventList from '../components/events/EventList';
import EventsSearch from '../components/events/EventsSearch';
import { getFeaturedEvents } from '../dummy-data';
import styles from '../styles/Home.module.css';
import { useRouter } from 'next/router';


export default function Home() {
    const featuredEvents = getFeaturedEvents();
    const router = useRouter();

    const findEventsHandler = (year, month) => {
        const fullPath = `/events/${year}/${month}`
       router.push(fullPath)
    };

    return (
        <>
            <EventsSearch onSearch={findEventsHandler} />
            <EventList items={featuredEvents} />
        </>
    );
}
