import Link from 'next/link';
import React from 'react';
import AddressIcon from '../icons/AddressIcon';
import ArrowRightIcon from '../icons/ArrowRightIcon';
import DateIcon from '../icons/DateIcon';
import Button from '../ui/Button';
import classes from './event-item.module.css';

const EventItem = (props) => {
    const { title, image, date, location, id } = props;

    const humanRadableDate = new Date(date).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    const formattedAddress = location.replace(', ', '\n');

    const exploreLink = `/events/${id}`;

    return (
        <div>
            <li className={classes.item}>
                <img src={'/' + image} alt="" />
                <div className={classes.content}>
                    <div className={classes.summary}>
                        <h2>{title}</h2>
                        <div className={classes.date}>
                            <DateIcon />
                            <time>{humanRadableDate}</time>
                        </div>
                        <div className={classes.address}>
                            <AddressIcon />
                            <address>{formattedAddress}</address>
                        </div>
                    </div>
                    <div className={classes.actions}>
                        <Button link={exploreLink}>
                            <span>Explore Event</span>
                            <span className={classes.icon}>
                                <ArrowRightIcon />
                            </span>
                        </Button>
                    </div>
                </div>
            </li>
        </div>
    );
};

export default EventItem;
