"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserApiResponseMapper = void 0;
class UserApiResponseMapper {
    fromDomain(user) {
        return {
            email: user.props.email,
            name: user.props.name,
            role: user.props.role
        };
    }
}
exports.UserApiResponseMapper = UserApiResponseMapper;
