"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateStoreId = void 0;
function generateStoreId(restaurantName) {
    return __awaiter(this, void 0, void 0, function* () {
        // Unique identifier (e.g., initials)
        const firstChar = restaurantName.charAt(0).toUpperCase();
        const lastChar = restaurantName
            .charAt(restaurantName.length - 1)
            .toUpperCase();
        const middleChars = shuffleString(restaurantName.substring(1, restaurantName.length - 1).toUpperCase());
        // Generate a random four-digit number
        const fourDigitNumber = Math.floor(1000 + Math.random() * 9000);
        // Combine and return the ID
        const restaurantId = `${firstChar}${lastChar}${middleChars}-${fourDigitNumber}`.replace(/\s/g, '');
        return restaurantId;
    });
}
exports.generateStoreId = generateStoreId;
/**
 * Shuffles a string and returns a new shuffled string.
 * @param {string} str - The string to shuffle.
 * @returns {string} The shuffled string.
 */
function shuffleString(str) {
    const array = str.split('');
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array.join('');
}
