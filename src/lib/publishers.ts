/**
 * Publisher lookup helpers for the Tailspin Toys catalog.
 *
 * These queries read publisher metadata from the local SQLite database for
 * Astro pages that list publisher filters and summary cards.
 */

import { asc } from 'drizzle-orm';
import type { Database } from './db';
import { publishers } from '../../db/schema';
import type { Publisher } from '../types/game';

const publisherSelection = {
    id: publishers.id,
    name: publishers.name,
};

/**
 * Retrieves every publisher in alphabetical order.
 *
 * @param db - Database client used to query the local SQLite catalog.
 * @returns A list of publisher summaries sorted by name.
 */
export async function getAllPublishers(db: Database): Promise<Publisher[]> {
    const rows = await db.select(publisherSelection).from(publishers).orderBy(asc(publishers.name));
    return rows.map((row) => ({
        id: row.id,
        name: row.name,
    }));
}
