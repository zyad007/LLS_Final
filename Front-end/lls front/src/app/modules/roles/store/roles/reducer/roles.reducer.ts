import { createReducer, on } from '@ngrx/store';
import { cloneDeep } from 'lodash';
import { RoleOnePage } from '../../../models/roles';
import { RolesPageActions } from '../action/roles-type';

export const initState: RoleOnePage = {
  currentPage: 1,
};
export const RolesPageReducer = createReducer(
  initState,
  on(RolesPageActions.RolesPageLoaded, (state, action) =>
    action.Roles
      ? {
          ...state,
          [action.currentPage]: action.Roles,
          currentPage: action.currentPage,
        }
      : state
  ),

  on(RolesPageActions.RolesNextLoaded, (state, action) => {
    if (action.Roles) {
      return {
        ...state,
        [action.currentPage]: action.Roles,
        currentPage: action.currentPage,
      };
    } else {
      return {
        ...state,
        currentPage: action.currentPage,
      };
    }
  }),
  on(RolesPageActions.RolesEdited, (state, action) => {
    const newDict = cloneDeep(state);
    const index = newDict?.[state.currentPage]?.data?.result?.findIndex(
      (val) => {
        return val.id === action.Role.id;
      }
    )!;
    let data = newDict?.[state?.currentPage]?.data?.result.splice(
      index,
      1,
      action.Role
    )!;
    return action
      ? {
          ...state,
          ...newDict,
        }
      : state;
  }),
  on(RolesPageActions.yourRoleDeleted, (state, action) => {
    const newDict = cloneDeep(state);
    newDict[state.currentPage].data.result = newDict?.[
      state?.currentPage
    ]?.data?.result?.filter((val) => {
      return val.id !== action.RoleId;
    });
    return {
      ...state,
      ...newDict,
    };
  }),
  on(RolesPageActions.RolesSubmited, (state, action) => {
    const newDict = cloneDeep(state);
    newDict?.[state?.currentPage]?.data?.result.push(action.data);
    return action
      ? {
          ...state,
          ...newDict,
        }
      : state;
  })
);
