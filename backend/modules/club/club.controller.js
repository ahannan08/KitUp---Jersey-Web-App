import * as clubService from "./club.service.js";

export const createClub = async (req, res) => {
  try {
    const club = await clubService.createClub(req.body);
    res.status(201).json({
      success: true,
      message: "Club created successfully",
      data: club,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const getAllClubs = async (req, res) => {
  try {
    const { page = 1, limit = 50 } = req.query;

    const result = await clubService.getAllClubs(parseInt(page), parseInt(limit));

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const getClubsByLeague = async (req, res) => {
  try {
    const { league } = req.params;
    const { page = 1, limit = 50 } = req.query;

    const result = await clubService.getClubsByLeague(
      league,
      parseInt(page),
      parseInt(limit)
    );

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const getClubById = async (req, res) => {
  try {
    const club = await clubService.getClubById(req.params.id);
    res.status(200).json({
      success: true,
      data: club,
    });
  } catch (err) {
    res.status(404).json({ success: false, message: err.message });
  }
};

export const getClubsGroupedByLeague = async (req, res) => {
  try {
    const groupedClubs = await clubService.getClubsGroupedByLeague();

    res.status(200).json({
      success: true,
      data: groupedClubs,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const updateClub = async (req, res) => {
  try {
    const club = await clubService.updateClub(req.params.id, req.body);
    res.status(200).json({
      success: true,
      message: "Club updated successfully",
      data: club,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const deleteClub = async (req, res) => {
  try {
    await clubService.deleteClub(req.params.id);
    res.status(200).json({
      success: true,
      message: "Club deleted successfully",
    });
  } catch (err) {
    res.status(404).json({ success: false, message: err.message });
  }
};

export const searchClubs = async (req, res) => {
  try {
    const { q, page = 1, limit = 50 } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        message: "Search query required",
      });
    }

    const result = await clubService.searchClubs(
      q,
      parseInt(page),
      parseInt(limit)
    );

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};