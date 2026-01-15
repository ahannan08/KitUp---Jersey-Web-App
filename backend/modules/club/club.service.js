import Club from "./club.model.js";

export const createClub = async (clubData) => {
  const existingClub = await Club.findOne({ name: clubData.name });
  if (existingClub) throw new Error("Club already exists");

  const club = await Club.create(clubData);
  return club;
};

export const getAllClubs = async (page = 1, limit = 50) => {
  const skip = (page - 1) * limit;

  const clubs = await Club.find({ isActive: true })
    .skip(skip)
    .limit(limit)
    .sort({ league: 1, name: 1 });

  const total = await Club.countDocuments({ isActive: true });

  return {
    clubs,
    totalClubs: total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
  };
};

export const getClubsByLeague = async (league, page = 1, limit = 50) => {
  const skip = (page - 1) * limit;

  const clubs = await Club.find({ league, isActive: true })
    .skip(skip)
    .limit(limit)
    .sort({ name: 1 });

  const total = await Club.countDocuments({ league, isActive: true });

  return {
    clubs,
    totalClubs: total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
    league,
  };
};

export const getClubById = async (id) => {
  const club = await Club.findById(id);
  if (!club) throw new Error("Club not found");
  return club;
};

export const getClubsGroupedByLeague = async () => {
  const clubs = await Club.find({ isActive: true }).sort({ league: 1, name: 1 });

  // Group clubs by league
  const groupedClubs = clubs.reduce((acc, club) => {
    if (!acc[club.league]) {
      acc[club.league] = [];
    }
    acc[club.league].push(club);
    return acc;
  }, {});

  return groupedClubs;
};

export const updateClub = async (id, updates) => {
  const club = await Club.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  });
  if (!club) throw new Error("Club not found");
  return club;
};

export const deleteClub = async (id) => {
  const club = await Club.findByIdAndDelete(id);
  if (!club) throw new Error("Club not found");
  return club;
};

export const searchClubs = async (searchTerm, page = 1, limit = 50) => {
  const skip = (page - 1) * limit;

  const clubs = await Club.find(
    { $text: { $search: searchTerm }, isActive: true },
    { score: { $meta: "textScore" } }
  )
    .sort({ score: { $meta: "textScore" } })
    .skip(skip)
    .limit(limit);

  const total = await Club.countDocuments({
    $text: { $search: searchTerm },
    isActive: true,
  });

  return {
    clubs,
    totalClubs: total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
  };
};