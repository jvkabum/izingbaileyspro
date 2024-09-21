"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageSyncMixin = void 0;
const mixin_1 = require("./mixin");
const constants_1 = require("../../constants");
const shared_1 = require("../../shared");
const mqtts_1 = require("mqtts");
class MessageSyncMixin extends mixin_1.Mixin {
    apply(client) {
        (0, mixin_1.hook)(client, 'connect', {
            post: () => {
                if (!client.mqtt) {
                    throw new mqtts_1.IllegalStateError('No mqtt client created');
                }
                client.mqtt.listen({
                    topic: constants_1.Topics.MESSAGE_SYNC.id,
                    transformer: async ({ payload }) => constants_1.Topics.MESSAGE_SYNC.parser
                        .parseMessage(constants_1.Topics.MESSAGE_SYNC, await (0, shared_1.tryUnzipAsync)(payload))
                        .map(msg => msg.data),
                }, data => this.handleMessageSync(client, data));
            },
        });
    }
    handleMessageSync(client, syncData) {
        for (const element of syncData) {
            const data = element.data;
            if (!data) {
                client.emit('iris', element);
                continue;
            }
            delete element.data;
            data.forEach(e => {
                if (!e.path) {
                    client.emit('iris', { ...element, ...e });
                }
                if (e.path.startsWith('/direct_v2/threads') && e.value) {
                    client.emit('message', {
                        ...element,
                        message: {
                            path: e.path,
                            op: e.op,
                            thread_id: MessageSyncMixin.getThreadIdFromPath(e.path),
                            ...JSON.parse(e.value),
                        },
                    });
                }
                else {
                    client.emit('threadUpdate', {
                        ...element,
                        meta: {
                            path: e.path,
                            op: e.op,
                            thread_id: MessageSyncMixin.getThreadIdFromPath(e.path),
                        },
                        update: {
                            ...JSON.parse(e.value),
                        },
                    });
                }
            });
        }
    }
    static getThreadIdFromPath(path) {
        const itemMatch = path.match(/^\/direct_v2\/threads\/(\d+)/);
        if (itemMatch)
            return itemMatch[1];
        const inboxMatch = path.match(/^\/direct_v2\/inbox\/threads\/(\d+)/);
        if (inboxMatch)
            return inboxMatch[1];
        return undefined;
    }
    get name() {
        return 'Message Sync';
    }
}
exports.MessageSyncMixin = MessageSyncMixin;
//# sourceMappingURL=message-sync.mixin.js.map