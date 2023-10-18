import ShortUniqueId from "short-unique-id";

export function GenerateRsvp(){
    const res = new ShortUniqueId({
        length: 20,
        dictionary: 'alphanum_lower'
    })
    return res.rnd();
}