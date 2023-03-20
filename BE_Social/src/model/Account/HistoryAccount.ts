import mongoose, { Document, Schema } from 'mongoose';
const mongooseDelete = require('mongoose-delete');
import paginate from 'mongoose-paginate-v2';
import { IHistoryAccount } from '../../interface/Schema/IHistoryAccount';

export interface IHistoryAccountModel extends IHistoryAccount, Document { }


const HistoryAccountSchema = new Schema(
    {
        idAccount: {
            type: Schema.Types.ObjectId
        },
        description: {
            type: Schema.Types.String
        },
        type: {
            type: Schema.Types.String
        }
    },
    {
        timestamps: true,
        collection: 'HistoryAccount',
    }
)

HistoryAccountSchema.plugin(mongooseDelete, {
    overrideMethods: false,
    deletedAt: true,
    use$neOperator: false,
    // deleted: true
});

// paginate
HistoryAccountSchema.plugin(paginate);

export default mongoose.model<IHistoryAccountModel>('HistoryAccount', HistoryAccountSchema);
