'''
 @author Pob Vutisalchavakul 4/5/2016
 Get the most popular NBA team in the state
 The information is based upon: http://www.vividseats.com/blog/most-popular-nba-teams-by-us-state
''' 
#Declaring Global Variables
ATL = ["AL", "GA"]
BOS = ["ME", "MA", "NH", "RI", "VT"]
CHA = ["NC", "SC"]
CHI = ["IL", "IA", "NE"]
CLE = ["OH", "WV"]
DEN = ["CO", "NM", "WY"]
LAL = ["AK", "CA", "HI", "NV"]
MEM = ["AR", "MS", "TN"]
MIN = ["MN", "ND", "SD"]
NOP = ["KY", "LA"]
NYK = ["CT", "NJ", "NY"]
OKC = ["KS", "MO", "OK"]
PHI = ["DE", "PA"]
POR = ["OR", "WA"]
UTA = ["ID", "MT", "VA"]

def getNBATeam(state):
	if(state in ATL):
		return "ATL"
	elif(state in BOS):
		return "BOS"
	elif(state in CHA):
		return "CHA"
	elif(state in CHI):
		return "CHI"
	elif(state in CLE):
		return "CLE"
	elif(state in DEN):
		return "DEN"
	elif(state in LAL):
		return "LAL"
	elif(state in MEM):
		return "MEM"
	elif(state in MIN):
		return "MIN"
	elif(state in NOP):
		return "NOP"
	elif(state in NYK):
		return "NYK"
	elif(state in OKC):
		return "OKC"
	elif(state in PHI):
		return "PHI"
	elif(state in POR):
		return "POR"
	elif(state in UTA):
		return "UTA"
	else:
		return "Something went wrong, could not figure out local team."