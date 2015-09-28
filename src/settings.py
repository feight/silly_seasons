# -*- coding: utf-8 -*-


settings = {}


# -------------------------------------------------------------------------- #
#
#       extend settings from app_settings
#
# -------------------------------------------------------------------------- #


import collections

from gaext.settings.all import settings as app_settings

def update(orig_dict, new_dict):
    for key, val in new_dict.iteritems():
        if isinstance(val, collections.Mapping):
            tmp = update(orig_dict.get(key, { }), val)
            orig_dict[key] = tmp
        elif isinstance(val, list):
            orig_dict[key] = (orig_dict[key] + val)
        else:
            orig_dict[key] = new_dict[key]
    return orig_dict

settings = update(app_settings, settings)
