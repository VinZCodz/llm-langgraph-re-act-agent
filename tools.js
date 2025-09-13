import { z } from "zod";
import { TavilySearch } from "@langchain/tavily";
import { tool } from "@langchain/core/tools";
import * as calender from "./calender.js";

const searchTool = new TavilySearch({
    maxResults: 3,
    topic: "general",
});

const getCalenderEventsByDate = tool(
    async ({ date }) => {
        return JSON.stringify(calender.getCalenderEventsByDate(date));
    },
    {
        name: "getCalenderEventsByDate",
        description: "Call to get the calender events by providing the date.",
        schema: z.object({
            date: z.string().describe("The event date in ISO string format:YYYY-MM-DD, to be used in calender event search."),
        }),
    }
);

const getCalenderEventsBySubject = tool(
    async ({ likeSubject }) => {
        return JSON.stringify(calender.getCalenderEventsBySubject(likeSubject));
    },
    {
        name: "getCalenderEventsBySubject",
        description: "Call to get the calender events by providing the similar subject.",
        schema: z.object({
            likeSubject: z.string().describe("The like subject has similar keywords, to be used in calender event search."),
        }),
    }
);

const createCalenderEvent = tool(
    async ({ date, subject, description }) => {
        try {
            calender.createCalenderEvent({
                date: date,
                subject: subject,
                description: description
            });
            return "Event Added!";
        } catch (error) {
            return error;
        }
    },
    {
        name: "createCalenderEvent",
        description: "Call to create the calender event by providing the ISO date in string, subject, description.",
        schema: z.object({
            date: z.string().describe("The event date in ISO string format:YYYY-MM-DD, to be used in calender event create."),
            subject: z.string().describe("The event subject, to be used in calender event create."),
            description: z.string().describe("The event description, to be used in calender event create."),
        }),
    }
);

const updateCalenderEvent = tool(
    async ({ calenderEvent, newDate }) => {
        try {
            calender.updateCalenderEvent(calenderEvent, newDate);
            return "Event Updated!";
        } catch (error) {
            return error;
        }
    },
    {
        name: "updateCalenderEvent",
        description: "Call to update the calender event by providing the existing calenderEvent object and new ISO date in string.",
        schema: z.object({
            calenderEvent: z.object({
                date: z.string().describe("The event date in ISO string format:YYYY-MM-DD."),
                subject: z.string().describe("The event subject."),
                description: z.string().describe("The event description."),

            }).describe("The existing calenderEvent object, to be used in calender event update."),
            newDate: z.string().describe("The new event date in ISO string format:YYYY-MM-DD, to be used in calender event update."),
        }),
    }
);

const deleteCalenderEvent = tool(
    async ({ calenderEvent }) => {
        try {
            calender.deleteCalenderEvent(calenderEvent);
            return "Event Deleted!";
        } catch (error) {
            return error;
        }
    },
    {
        name: "deleteCalenderEvent",
        description: "Call to delete the calender event by providing the existing calenderEvent object.",
        schema: z.object({
            calenderEvent: z.object({
                date: z.string().describe("The event date in ISO string format:YYYY-MM-DD."),
                subject: z.string().describe("The event subject."),
                description: z.string().describe("The event description."),

            }).describe("The existing calenderEvent object, to be used in calender event delete."),
        }),
    }
);

export const availableTools = [
    getCalenderEventsByDate,
    getCalenderEventsBySubject,
    createCalenderEvent,
    updateCalenderEvent,
    deleteCalenderEvent,
    searchTool
];