import React from 'react';
import { getFilteredEvents } from '../../helpers/api.util';
import EventList from '../../components/events/EventList';
import ResultsTitle from '../../components/events/ResultsTitle';
import Button from '../../components/ui/Button';
import ErrorAlert from '../../components/ui/ErrorAlert';

const FilteredEventsPage = (props) => {
    // const router = useRouter();

    // const filteredData = router.query.slug;

    // if (!filteredData) {
    //     return <p className="center">Loading</p>;
    // }

    // const filteredYear = filteredData[0];
    // const filteredMonth = filteredData[1];

    // const numYear = +filteredYear;
    // const numMonth = +filteredMonth;

    if (props.hasError) {
        return (
            <>
                <ErrorAlert>
                    <p>Invalid filter adjust your values</p>
                </ErrorAlert>
                <Button link="/events">Show All Events</Button>
            </>
        );
    }

    const filteredEvents = props.events;

    if (!filteredEvents || filteredEvents.length === 0) {
        return (
            <> 
                <ErrorAlert>
                    <p>No Events Found</p>
                </ErrorAlert>
                <Button link="/events">Show All Events</Button>
            </>
        );
    }

    const date = new Date(props.date.year, props.date.month - 1);

    return (
        <div>
            <ResultsTitle date={date} />
            <EventList items={filteredEvents} />
        </div>
    );
};

export async function getServerSideProps(context) {
    const { params } = context;

    const filteredData = params.slug;

    if (!filteredData) {
        return <p className="center">Loading</p>;
    }

    const filteredYear = filteredData[0]; 
    const filteredMonth = filteredData[1];

    const numYear = +filteredYear;
    const numMonth = +filteredMonth;

    if (
        isNaN(numYear) ||
        isNaN(numMonth) ||
        numYear > 2030 ||
        numYear < 2021 ||
        numMonth < 1 ||
        numMonth > 12
    ) {
        return {
            props: { hasError: true },
            // notFound: true,
            // redirect: {
            //     destination: '/error'
            // }
        };
    }

    const filteredEvents = await getFilteredEvents({
        year: numYear,
        month: numMonth,
    });

    return {
        props: {
            events: filteredEvents,
            date: {
                year : numYear,
                month: numMonth
            }
        },
    };
}

export default FilteredEventsPage;
