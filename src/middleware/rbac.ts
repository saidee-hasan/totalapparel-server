import { Request, Response, NextFunction } from 'express';

export const requireSuperAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (!req.user) {
    res.status(401).json({
      success: false,
      message: 'Authentication required.',
    });
    return;
  }

  if (req.user.role !== 'superadmin') {
    res.status(403).json({
      success: false,
      message: 'Access denied: Super Admin privileges required for this action.',
    });
    return;
  }

  next();
};

export const requireSelfOrSuperAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (!req.user) {
    res.status(401).json({
      success: false,
      message: 'Authentication required.',
    });
    return;
  }

  const targetStaffId = req.params.id;
  const isSuperAdmin = req.user.role === 'superadmin';
  const isSelf = String(req.user._id) === String(targetStaffId);

  if (!isSuperAdmin && !isSelf) {
    res.status(403).json({
      success: false,
      message: 'Access denied: You are only allowed to manage your own profile.',
    });
    return;
  }

  // If moderator is updating themselves, prevent them from elevating their role or changing status
  if (!isSuperAdmin && isSelf) {
    if (req.body.role && req.body.role !== req.user.role) {
      res.status(403).json({
        success: false,
        message: 'Access denied: Moderators cannot modify their own role.',
      });
      return;
    }
    if (req.body.status && req.body.status !== req.user.status) {
      res.status(403).json({
        success: false,
        message: 'Access denied: Moderators cannot change their account status.',
      });
      return;
    }
  }

  next();
};
