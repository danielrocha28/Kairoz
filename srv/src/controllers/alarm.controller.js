import Alarm from '../model/alarm.model.js';
import { loginUser } from './user.controller.js';
import alarmSchema from '../validators/alarm.schema.js';
import User from '../model/user.model.js';
import { alarmNotification } from '../notifications/alarm.notifications.js';

class AlarmId {
  constructor() {
    this.id = null;
  }
}

const getAlarm = new AlarmId();

// Function to get the current date and start counting if it matches the defined one
function alarmCount(alarm_day) {
  const date = new Date();
  const day = date.getDay();
  const options = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'];

  if (options[day] === alarm_day) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return (`${hours}:${minutes}`);
  }
}

export async function createAlarm(request, reply) {
  try {
    const validatedData = alarmSchema.parse(request.body);
    const user = await User.findOne({ where: { id_user: loginUser.id } });

    if (!user) {
      return reply.status(404).send('User not found.');
    }

    const newAlarm = await Alarm.create(validatedData);
    getAlarm.id = newAlarm.id_alarm;
    const statusAlarm = await Alarm.findOne({ where: { executed: true, id_alarm: newAlarm.id_alarm } });

    if (statusAlarm) {
      await usingAlarm(request, reply);
      return reply.status(200).send(newAlarm);
    } else {
      return reply.status(200).send(newAlarm);
    }

  } catch (error) {
    console.error(error);
    return reply.status(500).send({ error: 'Error creating the alarm.', message: error.message });
  }
}

// Function if the alarm is activated
export async function usingAlarm(request, reply) {
  try {
    const alarm = await Alarm.findOne({ where: { id_alarm: request.params.id_alarm || getAlarm.id } });

    if (!alarm) {
      return reply.status(404).send('Alarm not found');
    }

    const time = alarmCount(alarm.alarm_day);
    // If the time matches the current time, send a notification
    if (alarm.alarm_time === time) {
      await alarmNotification(loginUser.id, time, alarm.message);
    }

  } catch (error) {
    console.error(error);
    return reply.status(500).send({ error: 'Error manipulating the alarm.', message: error.message });
  }
}

export async function updateAlarm(request, reply) {
  try {
    const validatedData = alarmSchema.parse(request.body);
    const [updated] = await Alarm.update(validatedData, {
      where: { id_alarm: request.params.id_alarm },
    });

    if (updated) {
      const updatedAlarm = await Alarm.findByPk(request.params.id_alarm);
      return updatedAlarm;
    } else {
      reply.status(404).send({ error: `Alarm with id_alarm ${request.params.id_alarm} not found` });
    }
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ error: 'Error manipulating the alarm.', message: error.message });
  }
}

export async function deleteAlarm(request, reply) {
  try {
    const alarm = await Alarm.findOne({ where: { id_alarm: request.params.id_alarm } });

    if (!alarm) {
      return reply.status(404).send('Alarm not found');
    }

    const deleted = await Alarm.destroy({ where: { id_alarm: alarm.id_alarm } });

    if (deleted) {
      return reply.status(200).send('Alarm deleted');
    }
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ error: 'Error deleting the alarm.', message: error.message });
  }
}