import { Document, Types } from 'mongoose';
export type TravelPostDocument = TravelPost & Document;
export declare class TravelPost {
    userId: Types.ObjectId;
    fromCountry: string;
    fromCity: string;
    fromArea?: string;
    fromGeo?: {
        type: string;
        coordinates: number[];
    };
    toCountry: string;
    toCity: string;
    toArea?: string;
    toGeo?: {
        type: string;
        coordinates: number[];
    };
    transportPreference: string;
    preferredGender?: string;
    travelDate: Date;
    timeRangeStart?: string;
    timeRangeEnd?: string;
    interests: string[];
    reason: string;
    expiresAt: Date;
}
export declare const TravelPostSchema: import("mongoose").Schema<TravelPost, import("mongoose").Model<TravelPost, any, any, any, (Document<unknown, any, TravelPost, any, import("mongoose").DefaultSchemaOptions> & TravelPost & {
    _id: Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}) | (Document<unknown, any, TravelPost, any, import("mongoose").DefaultSchemaOptions> & TravelPost & {
    _id: Types.ObjectId;
} & {
    __v: number;
}), any, TravelPost>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, TravelPost, Document<unknown, {}, TravelPost, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<TravelPost & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    userId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, TravelPost, Document<unknown, {}, TravelPost, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TravelPost & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    fromCountry?: import("mongoose").SchemaDefinitionProperty<string, TravelPost, Document<unknown, {}, TravelPost, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TravelPost & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    fromCity?: import("mongoose").SchemaDefinitionProperty<string, TravelPost, Document<unknown, {}, TravelPost, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TravelPost & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    fromArea?: import("mongoose").SchemaDefinitionProperty<string | undefined, TravelPost, Document<unknown, {}, TravelPost, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TravelPost & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    fromGeo?: import("mongoose").SchemaDefinitionProperty<{
        type: string;
        coordinates: number[];
    } | undefined, TravelPost, Document<unknown, {}, TravelPost, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TravelPost & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    toCountry?: import("mongoose").SchemaDefinitionProperty<string, TravelPost, Document<unknown, {}, TravelPost, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TravelPost & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    toCity?: import("mongoose").SchemaDefinitionProperty<string, TravelPost, Document<unknown, {}, TravelPost, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TravelPost & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    toArea?: import("mongoose").SchemaDefinitionProperty<string | undefined, TravelPost, Document<unknown, {}, TravelPost, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TravelPost & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    toGeo?: import("mongoose").SchemaDefinitionProperty<{
        type: string;
        coordinates: number[];
    } | undefined, TravelPost, Document<unknown, {}, TravelPost, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TravelPost & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    transportPreference?: import("mongoose").SchemaDefinitionProperty<string, TravelPost, Document<unknown, {}, TravelPost, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TravelPost & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    preferredGender?: import("mongoose").SchemaDefinitionProperty<string | undefined, TravelPost, Document<unknown, {}, TravelPost, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TravelPost & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    travelDate?: import("mongoose").SchemaDefinitionProperty<Date, TravelPost, Document<unknown, {}, TravelPost, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TravelPost & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    timeRangeStart?: import("mongoose").SchemaDefinitionProperty<string | undefined, TravelPost, Document<unknown, {}, TravelPost, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TravelPost & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    timeRangeEnd?: import("mongoose").SchemaDefinitionProperty<string | undefined, TravelPost, Document<unknown, {}, TravelPost, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TravelPost & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    interests?: import("mongoose").SchemaDefinitionProperty<string[], TravelPost, Document<unknown, {}, TravelPost, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TravelPost & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    reason?: import("mongoose").SchemaDefinitionProperty<string, TravelPost, Document<unknown, {}, TravelPost, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TravelPost & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    expiresAt?: import("mongoose").SchemaDefinitionProperty<Date, TravelPost, Document<unknown, {}, TravelPost, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TravelPost & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, TravelPost>;
